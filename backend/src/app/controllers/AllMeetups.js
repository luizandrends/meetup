import Meetup from '../models/Meetup';

class AllMeetups {
  async show(req, res) {
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      attributes: ['id', 'title', 'date'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(meetups);
  }
}

export default new AllMeetups();
