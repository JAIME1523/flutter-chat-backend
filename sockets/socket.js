const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket')


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    //verificar autenticacion
    if (!valido) {
        return client.disconnect();

    }
    //Cliente autenticado
    usuarioConectado(uid)

    //ingresar a un usuario en una sala
    //sala global, client.id, iddelusuarioMongo 
    client.join(uid);

    // client.to(uid).emit();
    //escuhar del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => {

        // console.log(payload);
        // console.log(payload.para);
        //grabar mensaje
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });





    client.on('disconnect', () => {
        // console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
