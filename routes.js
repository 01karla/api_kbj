const express = require('express');
const router = express.Router();
const connection = require('./db');

// obtener los registros
router.get('/admin', (req, res) => {
    connection.query('SELECT * FROM admin', (err, results) => {
        if (err) {
            console.error('Error al obtener registros:', err);
            res.status(500).json({
                 error: 'Error al obtener registros' });
            return;
        }
        res.json(results);
    });
});

// obtener un registro por su id 
router.get('/admin/:id_admin', (req, res) => {
    const id_admin = req.params.id_admin;
    connection.query('SELECT * FROM admin WHERE id_admin = ?', id_admin, (err, results) => {
        if (err) {
            console.error('Error al obtener el registro:', err);
            res.status(500).json({ error: 'Error al obtener el registro' });
            return;
        }
        if(results.length === 0) {
            res.status(404).json({ error: 'registro no encontrado'});
            return;
        }
        res.json(results[0]);
    });
});

//Crear un nuevo registro de administrador
router.post('/admin', (req, res) => {
    const nuevoRegistro = req.body;
    connection.query('INSERT INTO admin SET ?', nuevoRegistro, (err, results) => {
        if (err) {
            console.error('Error al crear un nuevo registro', err);
            res.status(500).json({error: 'Error al crear un nuevo registro' });
            return;
        }
        res.status(201).json({ message: 'Registro creado exitosamente'});
    });
});

//Actualizar un registro de administrador
router.put('/admin/:id_admin', (req, res) => {
    const id_admin = req.params.id_admin;
    const datosActualizados = req.body;
    connection.query('UPDATE admin SET ? WHERE id_admin = ?', [datosActualizados, id_admin], (err, results) => {
        if (err) {
            console.error('Error al actualizar el registro:', err);
            res.status(500).json({ error:'Error al actualizar el registro'});
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente'});
    });
});

// eliminar un registro de administrador
router.delete('/admin/:id_admin', (req, res) => {
    const id_admin = req.params.id_admin;
    connection.query('DELETE FROM admin WHERE id_admin = ?', id_admin, (err, results) => {
        if (err) {
            console.error('Error al eliminar el registro:', err);
            res.status(500).json({ error: 'Error al eliminar el registro' });
            return;
        }
        res.json({ message: 'Registro eliminado correctamente' });
    });
});

// obtener todos los registros de dos tablas 
router.get('/datos', (req, res) => {
    connection.query('SELECT abe.letra AS letra, his.fecha AS fecha FROM abecedario AS abe INNER JOIN historial_letra AS his ON abe.id_abecedario = his.id_abecedario', (err, results) => {
        if (err) {
            console.error('Error al obtener los registros:', err);
            res.status(500).json({ error: 'Error al obtener registros' });
            return;
        }
        res.json(results);
    });
});

//----------------------------- RUTAS PARA LA TABLA ABECEDARIO------

// crear un nuevo registro del abecedario
router.post('/letra', (req, res) => {
    const nuevoRegistroLetra = req.body;
    connection.query('INSERT INTO abecedario SET ?', nuevoRegistroLetra, (err, results) => {
        if (err) {
            console.error('Error al crear un nuevo registro', err);
            res.status(500).json({error: 'Error al crear un nuevo registro en abecedario' });
            return;
        }
        res.status(201).json({ message: 'Registro creado exitosamente en abecedario'});
    });
});

// obtener los registros del abecedario
router.get('/letra', (req, res) => {
    connection.query('SELECT * FROM abecedario', (err, results) => {
        if (err) {
            console.error('Error al obtener registros:', err);
            res.status(500).json({ error: 'Error al obtener registros' });
            return;
        }
        res.json(results);
    });
});

// obtener un registro por su id 
router.get('/letra/:id_abecedario', (req, res) => {
    const id_abecedario = req.params.id_abecedario;

    // Ejecutar la consulta SELECT
    connection.query('SELECT * FROM abecedario WHERE id_abecedario = ?', id_abecedario, (err, results) => {
        if (err) {
            console.error('Error al obtener el registro:', err);
            res.status(500).json({ error: 'Error al obtener el registro' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'registro no encontrado' });
            return;
        }

        // Insertar los datos en la tabla historial_letra
        const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener la fecha actual en formato MySQL
        connection.query('INSERT INTO historial_letra (id_abecedario, fecha) VALUES (?, ?)', [id_abecedario, fechaActual], (err, insertResult) => {
            if (err) {
                console.error('Error al guardar en el historial:', err);
                res.status(500).json({ error: 'Error al guardar en el historial' });
                return;
            }else{
                console.log('consulta guardada en la tabla historial_letra');
            }
            // Si la inserción es exitosa, enviar los resultados de la consulta al cliente
            res.json(results[0]);
        });
    });
});

//Actualizar un registro de abecedario
router.put('/letra/:id_abecedario', (req, res) => {
    const id_abecedario = req.params.id_abecedario;
    const datosActualizados = req.body;
    connection.query('UPDATE abecedario SET ? WHERE id_abecedario = ?', [datosActualizados, id_abecedario], (err, results) => {
        if (err) {
            console.error('Error al actualizar el registro:', err);
            res.status(500).json({ error:'Error al actualizar el registro'});
            return;
        }
        res.json({ message: 'Registro actualizado exitosamente'});
    });
});

// eliminar un registro de administrador
router.delete('/letra/:id_abecedario', (req, res) => {
    const id_abecedario = req.params.id_abecedario;
    connection.query('DELETE FROM abecedario WHERE id_abecedario = ?', id_abecedario, (err, results) => {
        if (err) {
            console.error('Error al eliminar el registro:', err);
            res.status(500).json({ error: 'Error al eliminar el registro' });
            return;
        }
        res.json({ message: 'Registro eliminado correctamente' });
    });
});



module.exports = router;
