import 'dotenv/config';
import app from './app';
import { connectDB } from './database';

connectDB();
app.listen(2003, () => console.log('server on port 2003'));