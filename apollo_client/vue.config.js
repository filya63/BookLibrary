module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.gql?$/,
                    use: [
                        {
                            loader: 'graphql-tag/loader',
                            options: {}
                        }
                    ]
                }
            ]
        }
    },
}