import * as Yup from 'yup';
import { parseISO, isBefore, subHours, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
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
      order: ['date'],
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
      attributes: ['id', 'title', 'description', 'location', 'date', 'user_id'],
    });

    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Only the organizer can view this Meetup.' });
    }
    return res.json(meetup);
  }

  async store(req, res) {
    console.log(req.body);

    const user_id = req.userId;

    const schema = Yup.object().shape({
      file_id: Yup.number().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(401).json({ error: 'Past dates are note permitted' });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      file_id: Yup.number(),
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    const dateWithSub = subHours(meetup.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'you can only update your meetups 2 hours earlier',
      });
    }

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Only the owner can make changes' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(401).json({ error: 'Past dates are note permitted' });
    }

    if (meetup.past) {
      return res.status(401).json({ error: "Can't update past meetups" });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    const dateWithSub = subHours(meetup.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'you can only update your meetups 2 hours earlier',
      });
    }

    if (meetup.user_id !== user_id) {
      return res
        .status(401)
        .json({ error: 'Only the owner can delete the meetup' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(401)
        .json({ error: 'You can only delete an meetup 2 hours earlier' });
    }

    if (meetup.past) {
      return res.status(401).json({ error: "Can't delete past meetups" });
    }

    await meetup.destroy();

    return res.json(meetup);
  }
}

export default new MeetupController();
