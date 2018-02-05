const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const userAgent = require('koa-useragent');
const path = require('path')
const swig = require('swig');
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/template")

app.use(userAgent);

router.get('/', function(ctx, next){
        let template = swig.compileFile(path.resolve(templateRoot, "index.html"));
        ctx.body = template({})
});

router.get('/mybook', function(ctx, next){
    let template = swig.compileFile(path.resolve(templateRoot, "mybook.html"));
    ctx.body = template({})
});
router.get('/login', function(ctx, next){
    let template = swig.compileFile(path.resolve(templateRoot, "login.html"));
    ctx.body = template({})
});
router.get('/landing', function(ctx, next){
    let template = swig.compileFile(path.resolve(templateRoot, "landing.html"));
    ctx.body = template({})
});

router.get(/^\/static(?:\/|$)/, async(ctx) => {
    let filepath = ctx.path.replace(/static\//, "")
    await send(ctx, filepath, {
        root: path.join(__dirname, "../dist")
    });
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');
