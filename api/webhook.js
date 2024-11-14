import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const order = req.body;
        const customerName = order.customer.first_name;
        const customerPhone = order.customer.phone.replace(/\D/g, ''); // Remove any non-digit characters
        const orderId = order.id;
        const totalAmount = order.total_price;

        // Construct the WhatsApp message
        const message = `Hi ${customerName}, thank you for your order #${orderId} for $${totalAmount}. We’ll keep you updated on your order status!`;

        // WhatsApp Business API URL and access token
        const whatsappApiUrl = 'https://graph.facebook.com/v21.0/477044148822911/messages';
        const accessToken = 'EAARr7QzRsQoBOzSlQLikpfWZCjGuF9ui9XK5jOjgRBOqgOYXi7iGmhzuMLXZA5l2XKl0HVxHJKoUmR30Grr4DPNi8mi6E4cJOwMNZBHPwWq51n9VxDJvvpi2CQ6HFxpdId0Lgx6zfnZCyJzlhjdIqxtjmXq6ZAyVJf7RxShSIxZCWb9xCAsZABoxVb3z0RYa1btuqFks6aXJRxZB1eZAf2erL0avVQZBAZD';

        // API request payload for WhatsApp
        const data = {
            messaging_product: 'whatsapp',
            to: customerPhone,
            type: 'text',
            text: {
                body: message,
            },
        };

        try {
            // Send message via WhatsApp Business API
            const response = await fetch(whatsappApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                res.status(200).json({ status: 'Message sent successfully', result });
            } else {
                console.error('Error sending WhatsApp message:', result);
                res.status(500).json({ status: 'Error sending WhatsApp message', error: result });
            }
        } catch (error) {
            console.error('Error processing webhook:', error);
            res.status(500).json({ status: 'Error processing webhook', error });
        }
    } else {
        res.status(405).end('Method Not Allowed');
    }
}
