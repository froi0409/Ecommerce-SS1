import * as db from '../../configs/database.config.js';

export async function productsUntilADate(startDate, endDate) {
    const conn = await db.getConnection();
    try {
        const productsList = await conn.query('SELECT p.product_id,p.product_name,s.supplier_name,p.unit_price,p.stock,p.date FROM PRODUCT AS p INNER JOIN SUPPLIER AS s ON p.supplier_id=s.supplier_id WHERE date BETWEEN ? AND ?',[
            startDate,
            endDate
        ]);
        return productsList;                
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function soldProductsByCategory(category) {
    const conn = await db.getConnection();
    try {
        const query =   `SELECT
                            pc.category_name,
                            p.product_name,
                            SUM(pd.quantity) AS total_sold,
                            SUM(pd.subtotal) AS total_sales
                        FROM
                            PRODUCT_DETAIL AS pd
                        JOIN
                            PRODUCT AS p ON pd.product_id = p.product_id
                        JOIN
                            PRODUCT_CATEGORY AS pc ON p.product_id = pc.product_id
                        JOIN
                            SALE AS s ON pd.sale_id = s.sale_id
                        WHERE
                            s.status = 1 AND pc.category_name=?
                        GROUP BY
                            pc.category_name, p.product_name
                        ORDER BY
                            pc.category_name, total_sold DESC;`;
        
        const productsList = await conn.query(query, [ category ]);
        return productsList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function soldProductsByName(name) {
    const conn = await db.getConnection();
    try {
        const query =   `SELECT
                            p.product_id,
                            p.product_name,
                            MAX(pc.category_name) AS category_name,
                            SUM(pd.quantity) AS total_sold,
                            SUM(pd.subtotal) AS total_sales
                        FROM
                            PRODUCT_DETAIL AS pd
                        JOIN
                            PRODUCT AS p ON pd.product_id = p.product_id
                        JOIN
                            PRODUCT_CATEGORY AS pc ON p.product_id = pc.product_id
                        JOIN
                            SALE AS s ON pd.sale_id = s.sale_id
                        WHERE
                            s.status = 1 AND p.product_name LIKE ?
                        GROUP BY
                            p.product_id, p.product_name
                        ORDER BY
                            p.product_name, total_sold DESC;
                        `;

        const productsList = await conn.query(query, [ `%${name}%` ]);
        return productsList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function soldProductsBySupplier(supplierName) {
    const conn = await db.getConnection();
    try {
        const query =   `SELECT
                            p.product_id,
                            p.product_name,
                            MAX(pc.category_name) AS category_name,
                            MAX(su.supplier_name) AS supplier_name,
                            SUM(pd.quantity) AS total_sold,
                            SUM(pd.subtotal) AS total_sales
                        FROM
                            PRODUCT_DETAIL AS pd
                        JOIN
                            PRODUCT AS p ON pd.product_id = p.product_id
                        JOIN
                            PRODUCT_CATEGORY AS pc ON p.product_id = pc.product_id
                        JOIN
                            SALE AS s ON pd.sale_id = s.sale_id
                        JOIN
                            SUPPLIER AS su ON p.supplier_id = su.supplier_id
                        WHERE
                            s.status = 1 AND su.supplier_name = ?
                        GROUP BY
                            p.product_id, p.product_name
                        ORDER BY
                            p.product_name, total_sold DESC;
                        `;
                    
        const productsList = await conn.query(query, [ supplierName ]);
        return productsList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function salesAboveAverage() {
    const conn = await db.getConnection();
    try {
        const averageQuery =    `SELECT FORMAT(AVG(subtotal), 2) AS average_sales
                                FROM PRODUCT_DETAIL
                                WHERE sale_id IN (SELECT sale_id FROM SALE WHERE status = 1);`

        const productsQuery =   `SELECT
                                    p.product_id,
                                    p.product_name,
                                    MAX(pc.category_name) AS category_name,
                                    MAX(su.supplier_name) AS supplier_name,
                                    SUM(pd.quantity) AS total_sold,
                                    SUM(pd.subtotal) AS total_sales
                                FROM
                                    PRODUCT_DETAIL AS pd
                                JOIN
                                    PRODUCT AS p ON pd.product_id = p.product_id
                                JOIN
                                    PRODUCT_CATEGORY AS pc ON p.product_id = pc.product_id
                                JOIN
                                    SALE AS s ON pd.sale_id = s.sale_id
                                JOIN
                                    SUPPLIER AS su ON p.supplier_id = su.supplier_id
                                WHERE
                                    s.status = 1
                                GROUP BY
                                    p.product_id, p.product_name
                                HAVING
                                    total_sales > (SELECT AVG(subtotal) FROM PRODUCT_DETAIL WHERE sale_id IN (SELECT sale_id FROM SALE WHERE status = 1));`
        const average = await conn.query(averageQuery);
        const productsList = await conn.query(productsQuery);
        return { average, productsList };
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function overallSales() {
    const conn = await db.getConnection();
    try {
        const overallSalesQuery = ` 
                    SELECT
                        FORMAT(SUM(pd.subtotal), 2) AS total_sales
                    FROM
                        PRODUCT_DETAIL AS pd
                    JOIN
                        SALE AS s ON pd.sale_id = s.sale_id
                    WHERE
                        s.status = 1;`;
        const salesQuery =  `
                    SELECT
                        s.sale_id,
                        s.sale_date,
                        s.sale_hour,
                        s.user_username,
                        GROUP_CONCAT(p.product_name ORDER BY pd.detail_id ASC) AS product_detail,
                        FORMAT(SUM(pd.subtotal), 2) AS total_sale
                    FROM
                        SALE AS s
                    JOIN
                        PRODUCT_DETAIL AS pd ON s.sale_id = pd.sale_id
                    JOIN
                        PRODUCT AS p ON pd.product_id = p.product_id
                    WHERE
                        s.status = 1
                    GROUP BY
                        s.sale_id, s.sale_date, s.sale_hour, s.user_username`;
        const overallSales = await conn.query(overallSalesQuery);
        const salesList = await conn.query(salesQuery);
        return { overallSales, salesList };
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function unsuccessfulSales() {
    const conn = await db.getConnection();
    try {
        const unsuccessfulSalesQuery = `
                    SELECT
                        s.sale_id,
                        s.sale_date,
                        s.sale_hour,
                        s.user_username,
                        s.message AS sale_message,
                        GROUP_CONCAT(p.product_name ORDER BY pd.detail_id ASC) AS product_detail
                    FROM
                        SALE AS s
                    JOIN
                        PRODUCT_DETAIL AS pd ON s.sale_id = pd.sale_id
                    JOIN
                        PRODUCT AS p ON pd.product_id = p.product_id
                    WHERE
                        s.status = 0
                    GROUP BY
                        s.sale_id, s.sale_date, s.sale_hour, s.user_username, s.message;`;
        const unsuccessfulSales = await conn.query(unsuccessfulSalesQuery);
        return unsuccessfulSales;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function getEmployees() {
    const conn = await db.getConnection();
    try {
        const employees = await conn.query('SELECT username,first_name,last_name,birth_date FROM USER WHERE user_type=?', [ 'ADMINISTRADOR' ]);
        return employees;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}
