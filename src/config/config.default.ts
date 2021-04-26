import * as typegoose from '@midwayjs/typegoose';

export const mongoose: typegoose.DefaultConfig = {
  uri: 'mongodb://midway:midway_pwd_123456@47.115.47.202:27017/midway',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'midway',
    user: 'midway',
    pass: 'midway_pwd_123456',
  },
};

export const secretKey = {
  key: 'secret',
};
