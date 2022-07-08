module.exports = {
    mode: 'development',
    // Adding Server
    devServer: {
        port: 8001,
    },
    style: {
        sass: {
            loaderOptions: {
                additionalData: `
                    @import "src/assets/styles/_color_palette.scss";
                    @import "src/assets/styles/_font_styles.scss";
                    @import "src/assets/styles/_element_styles.scss";
                `,
            },
        },
    },
};