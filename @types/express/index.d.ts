import { UserDTOInterface } from '../../src/interfaces/User.interface';

declare global {
    namespace Express {
        export interface Request {
            user?: UserDTOInterface;
        }
    }
}
