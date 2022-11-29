const Movies = require('../controllers/movie.controller');

module.exports = app => {
    app.get('/api/movies', Movies.findAll);
    app.get('/api/movies/:id', Movies.findOne);
    app.post('/api/movies', Movies.create);
    app.put('/api/movies/:id', Movies.Update);
    app.delete('/api/movies/:id', Movies.delete);
    
}











