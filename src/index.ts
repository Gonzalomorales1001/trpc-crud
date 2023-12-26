import 'dotenv/config';
import app from './app';
import { connectDB } from './database';

connectDB();
const PORT = process.env.PORT || 2003
app.listen(PORT, () => console.log(`server on port ${PORT}`));