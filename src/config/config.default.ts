import * as typegoose from '@midwayjs/typegoose';

export const mongoose: typegoose.DefaultConfig = {
  uri: 'mongodb://stock_super:pwdIs_stock_super@47.115.47.202:27017/stock',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'stock',
    user: 'stock_super',
    pass: 'pwdIs_stock_super',
  },
};

export const secretKey = {
  key: 'secret',
};
