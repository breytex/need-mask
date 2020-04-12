export function redirect(ctx, path) {
  const { res, router } = ctx;
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  } else if (router) {
    router.push(path);
  }
}
