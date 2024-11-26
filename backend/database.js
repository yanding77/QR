const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const setupDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
};

const getOrderCount = async () => {
    const orderCountRecord = await prisma.orderCount.findUnique({
        where: { id: 1 },
    });
    return orderCountRecord?.count || 0;
};

const incrementOrderCount = async () => {
    await prisma.orderCount.update({
        where: { id: 1 },
        data: { count: { increment: 1 } },
    });
};

const createOrder = async (orderId, items, total) => {
    return await prisma.order.create({
        data: {
            orderId,
            items: JSON.stringify(items),
            total: parseFloat(total),
        },
    });
};

module.exports = {
    setupDatabase,
    prisma,
    getOrderCount,
    incrementOrderCount,
    createOrder,
};
