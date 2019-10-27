import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Notification from '../schema/Notification';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import SubscribeMail from '../jobs/SubscribeMail';

class SubscriptionController {
  async index(req, res) {
    const subscription = await Subscription.findAll({
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'title', 'description', 'date', 'location'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name'],
            },
            {
              model: File,
              as: 'file',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(subscription);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own Meetups." });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past Metups." });
    }

    const user = await User.findByPk(req.userId);

    const checkSubscription = await Subscription.findOne({
      where: {
        user_id: user.id,
        meetup_id: meetup.id,
      },
    });

    if (checkSubscription) {
      return res
        .status(400)
        .json({ error: 'You are already registered for this Meetup!' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
          as: 'meetup',
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two Meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscribeMail.key, {
      meetup,
      user,
    });

    await Notification.create({
      content: `Voce tem uma nova inscricao de ${user.name} para o seguinte meetup: ${meetup.title}`,
      user: meetup.user_id,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (subscription.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Only the User can delete this Subscription.' });
    }

    const meetup = await Meetup.findByPk(subscription.meetup_id);

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: "You can't delete past Meeting Subscriptions!" });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
