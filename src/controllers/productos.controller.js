import {pool} from '../db.js'

export const getProductos = async (req, res) => {
    try {
        const[rows] = await pool.query('SELECT * FROM productos')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const getProducto = async (req,res)=>{
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE ProductoID = ?',[req.params.id])
        if(rows.length <= 0) return res.status(404).json({
            message:'Producto no encontrado'
        })
        res.json(rows[0]) 
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })   
    }
}

export const createProductos = async(req, res) => {
    try {
        const{CategoriaID,Nombre,Descripcion,Precio,Foto,Disponible} = req.body
        const [rows] = await pool.query('INSERT INTO productos(CategoriaID,Nombre,Descripcion,Precio,Foto,Disponible) VALUES (?,?,?,?,?,?)',
        [CategoriaID,Nombre,Descripcion,Precio,Foto,Disponible])
        res.send({
            id: rows.insertId,
            CategoriaID,
            Nombre,
            Descripcion,
            Precio,
            Foto,
            Disponible
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })  
    }
}


export const updateProductos = async (req, res) => {
    try {
        const{id} = req.params
        const {CategoriaID,Nombre,Descripcion,Precio,Foto,Disponible} = req.body
    
        const [result] = await pool.query('UPDATE productos SET CategoriaID = IFNULL(?,CategoriaID) ,Nombre = IFNULL(?,Nombre),Descripcion = IFNULL(?,Descripcion), Precio = IFNULL(?,Precio),Foto = IFNULL(?,Foto),Disponible =  IFNULL(?,Disponible) WHERE ProductoID  = ?',
        [CategoriaID,Nombre,Descripcion,Precio,Foto,Disponible,id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })
    
        const [rows] = await pool.query('SELECT * FROM productos WHERE ProductoID  = ?', [id])
    
        res.json(rows[0])
        console.log(result)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })  
    }
}

export const deleteProductos = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE ProductoID = ?',[req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        }) 
    }
    }