import { Express } from 'express';
import { AppContext } from './ctx';
import { Passport } from 'passport';

import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { env } from './env';

export const applyPassportToExpressApp = (
  expressApp: Express,
  ctx: AppContext
) => {
  const passport = new Passport();

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      },
      (jwtPayload: string, done) => {
        ctx.prisma.user
          .findUnique({ where: { id: jwtPayload } })
          .then((user) => {
            if (!user) {
              done(null, false);
              return;
            }
            done(null, user);
          })
          .catch((error) => {
            done(error, false);
          });
      }
    )
  );

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next();
      return;
    }
    passport.authenticate('jwt', { session: false }, (...args: never[]) => {
      req.user = args[1] || undefined;
      next();
    })(req, res, next);
  });
};
