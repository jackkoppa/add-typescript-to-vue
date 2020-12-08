module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '/add-typescript-to-vue/' : '/',
	chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}
