const express = require('express');
const app = express();

const musics = [
    {id: 1, artista: 'Adoradores', Cancion: 'Mi pastor', Duracion: '03:58'},
    {id: 2, artista: 'Conexión Cielo', Cancion: 'El Ladrón', Duracion: '04:59'},
    {id: 3, artista: 'Conpaz Compuesto', Cancion: 'Caminar en tus zapatos', Duracion: '03:12'},
    {id: 4, artista: 'Conpaz Compuesto', Cancion: 'Sentido de vivir', Duracion: '04:16'},
    {id: 5, artista: 'Forgiven', Cancion: 'Desde mi interior', Duracion: '04:02'},
    {id: 6, artista: 'Grupo Boses', Cancion: 'Confia', Duracion: '03:32'},
    {id: 7, artista: 'Jotta A', Cancion: 'Muestrame tu gloria', Duracion: '06:41'},
    {id: 8, artista: 'Quevedo', Cancion: 'NonStop', Duracion: '03:48'},
    {id: 9, artista: 'Union Chile', Cancion: 'Seguire por fe', Duracion: '05:04'},
    {id: 10, artista: 'Union Chilena', Cancion: 'Dame fe', Duracion: '04:45'}
]
var playlist = [];

app.use(express.json());

//Enviar listado de canciones
app.get('/api/music', (req, res) =>{
    res.send(musics);
});

//Agregar canciones a lista de reproduccion
app.post('/api/music/post/:id', (req, res) =>{
    const music = musics.find(c => c.id === parseInt(req.params.id));
    const play = playlist.find(c => c.idsong === parseInt(req.params.id));
    if(music === play) res.status(404).send('La cancion ya esta en la lista de reproduccion');
    const song = {
        id: playlist.length + 1,
        idsong: music.id,
        artista: music.artista,
        Cancion: music.Cancion,
        Duracion: music.Duracion
    };
    playlist.push(song);
    res.send(playlist);
});

//Quitar canciones de lista de reproduccion
app.delete('/api/music/:id', (req, res) =>{
    const music = playlist.find(c => c.id === parseInt(req.params.id));
    if(!music) res.status(404).send('La cancion no existe');
    const index = playlist.indexOf(music.id);
    playlist.splice(index, 1);
    res.send(playlist);
});

//Enviar los datos de la lista de reproduccion
app.get('/api/playlist', (req, res) =>{
    if(playlist.length === 0) res.status(404).send('No hay canciones en la lista de reproduccion');
    else res.send(playlist);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
