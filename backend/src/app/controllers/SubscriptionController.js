import User from '../models/User';
import Meetup from '../models/Meetup';
import Notification from '../schema/Notification';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import SubscribeMail from '../jobs/SubscribeMail';

class SubscriptionController {
  async index(req, res) {
    const subscription = await Meetup.findAll({
      order: ['date'],
      attributes: ['id', 'title', 'description'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      where: { user_id: req.user_id },
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
}

export default new SubscriptionController();
