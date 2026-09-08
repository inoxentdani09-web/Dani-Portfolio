export function requireAdminAuth(req, res, next) {
  // If explicitly logging out or on logout path
  if (req.query.logged_out === 'true') {
    res.clearCookie('admin_session', { path: '/', sameSite: 'none', secure: true });
    res.clearCookie('admin_session', { path: '/' });
    return res.redirect('/Admin/Login?logged_out=true');
  }

  const isCookieAuth = req.cookies && req.cookies.admin_session === 'authenticated';
  const isHeaderAuth = req.headers.authorization === 'Bearer authenticated' || req.headers['x-admin-auth'] === 'authenticated';
  const isQueryAuth = req.query.auth === 'authenticated' || req.query.token === 'admin_session';

  if (isCookieAuth || isHeaderAuth || isQueryAuth) {
    if (isQueryAuth && res.cookie) {
      res.cookie('admin_session', 'authenticated', {
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
      });
    }
    return next();
  }

  if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
    return res.status(401).json({ error: 'Unauthorized. Please login.' });
  }

  return res.redirect('/Admin/Login');
}
