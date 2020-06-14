import React from 'react'
import ignoreStyles from 'ignore-styles'
import app from './app'

global.React = React

app.set('port', process.env.PORT || 3000)
    .listen(
        app.get('port'),
        () => console.log(`tea running at 'http://localhost:${app.get('port')}'`)
    )


console.log(`host name: ${process.env.HOST}`)