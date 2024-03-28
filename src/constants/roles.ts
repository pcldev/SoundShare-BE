import { ObjectId } from 'mongodb';

const ROLE = {
  ADMIN: {
    id: new ObjectId('660439b5f41febdbb86f96b2'),
    name: 'admin',
  },
  USER: {
    id: new ObjectId('660439bff41febdbb86f96b4'),
    name: 'user',
  },
};

export default ROLE;
