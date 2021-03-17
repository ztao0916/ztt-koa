import path from 'path';
import ScanRouter from './common/scanRouter';

const router = new ScanRouter();

router.scan(path.resolve(__dirname, './controllers'));

export default router;