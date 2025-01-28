// Using Node.js `require()`
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://teresarey8:jm7xWYKjdaRffU4h@cluster0.y0i4v.mongodb.net/almacen')
    .then(() => console.log('Connected!'));

//definimos el esquema del documento
const ordenadorSchema = new mongoose.Schema({
    marca: String,
    precio: Number
});
//creamos el modelo, tabla sin la s, el schema que he definido y el nombre autentico del modelo
const Ordenador = mongoose.model('Ordenador', ordenadorSchema, 'ordenadores');
const BuscaPrimero = () => {

    //buscamos el primer registro
    Ordenador.findOne()
        .then(ordenador => {
            if (ordenador) {
                console.log('Primer ordenador encontrado', ordenador)
            } else {
                console.log('No se encontró ningún registro')
            }
        })
        .catch(err => console.log('Error al obtener el ordenador', err));
}
const buscaTodos = () => {

    //buscamos todos los registros
    Ordenador.find()
        .then(ordenadores => {
            if (ordenadores.length > 0) {
                console.log('Ordenadores encontrados', ordenadores);
            } else {
                console.log('No se encontró ningún registro')
            }
        })
        .catch(err => console.log('Error al obtener el ordenador', err));
}

const buscarPorId = (id) => {
    //buscamos por id
    Ordenador.findById(id)
        .then(ordenador => {
            if (ordenador) {
                console.log('Ordenadores encontrados', ordenador)
            } else {
                console.log('No se encontró ningún registro con el id')
            }
        })
        .catch(err => console.log('Error al obtener el ordenador', err));
}
const idBuscado = '6793dd0252603254a13ecbf3';
//buscarPorId(idBuscado);
/**
 * Busca por precio mayor a 300
 */
const buscaPrecioMayor = () => {

    //buscamos todos los registros
    Ordenador.find({ precio: { $gt: 300 } })
        .then(ordenadores => {
            if (ordenadores.length > 0) {
                console.log('Ordenadores encontrados con precio mayor a 300', ordenadores)
            } else {
                console.log('No se encontró ningún registro')
            }
        })
        .catch(err => console.log('Error al obtener el ordenador', err));
}
buscaTodos();
const crearNuevoOrdenador = (m, p) => {
    const nuevoOrdenador = new Ordenador({
        marca: m,
        precio: p
    });
    //guardar nel ordenador en la bse de datos
    nuevoOrdenador.save()
        .then(ordenador => console.log('Ordenador guardado: ', ordenador))
        .catch(err => console.error('error al guardar el ordenador:', err))
}
const actualizarOrdenador = (idOrdenador, nuevoPrecio) => {
    Ordenador.findByIdAndUpdate(idOrdenador, { precio: nuevoPrecio }, { new: true })
        .then(ordenadorActualizado => {
            if (ordenadorActualizado) {
                console.log('Ordenador actualizado:', ordenadorActualizado);
            } else {
                console.log('No se encontró ningún ordenador con ese ID.');
            }
        })
        .catch(err => console.error('Error al actualizar el ordenador:', err));
}
const borraOrdenador = (idOrdenadorParaBorrar) => {
    Ordenador.findByIdAndDelete(idOrdenadorParaBorrar)
        .then(ordenadorEliminado => {
            if (ordenadorEliminado) {
                console.log('Ordenador eliminado:', ordenadorEliminado);
            } else {
                console.log('No se encontró ningún ordenador con ese ID.');
            }
        })
        .catch(err => console.error('Error al eliminar el ordenador:', err));

}

module.exports = { buscaPrecioMayor, buscaTodos, buscarPorId, BuscaPrimero, actualizarOrdenador, crearNuevoOrdenador , borraOrdenador }