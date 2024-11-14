export default async function handler(req, res) {
    if (req.method === 'POST') {
        const order = req.body;
        const customerName = order.customer.first_name;
        const customerPhone = order.customer.phone;
        const orderId = order.id;
        const totalAmount = order.total_price;

        // Construct your WhatsApp message
        const message = `Hi ${customerName}, thank you for your order #${orderId} for $${totalAmount}.`;

        // Simulate sending WhatsApp (display message in logs)
        console.log("WhatsApp message to send:", message);

        res.status(200).json({ status: 'Webhook received' });
    } else {
        res.status(405).end();
    }
}
