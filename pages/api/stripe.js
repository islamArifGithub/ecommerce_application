import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //console.log(req.body.cartItems)
    try {

       const params = {
         submit_type: 'pay',
         mode: 'payment',
         payment_method_types: ['card'],
         billing_address_collection: 'auto',
         shipping_options: [
           { shipping_rate: 'shr_1L7aAfJEmq2Xdl2N9tR3I1tN' },
           { shipping_rate: 'shr_1L7aDbJEmq2Xdl2N6kaOutGp' },
         ],

        line_items: req.body.map((item) => {
           const img = item.image[0].asset._ref;
           const newImage = img.replace('image-', 'https://cdn.sanity.io/images/do8o6hyx/production/').replace('-webp', '.webp');
           
           return {
             price_data: {
               currency: 'usd',
               product_data: {
                 name: item.name,
                 images: [newImage],

               },
               unit_amount: item.price * 100,

             },
             adjustable_quantity: {
               enabled: true,
               minimum: 1,
               
             },
             quantity: item.quantity
           }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
    
       }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
        
      //res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

















// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     //console.log(req.body.cartItems)
//     try {
//       const params = {
//           submit_type: 'pay',
//           mode: 'payment',
//           payment_method_types: ['card'],
//           billing_address_collection: 'auto',
//           shipping_options: [
//             { shipping_rate: 'shr_1L7aAfJEmq2Xdl2N9tR3I1tN' },
//             { shipping_rate: 'shr_1L7aDbJEmq2Xdl2N6kaOutGp' },
//           ],

//         line_items: req.body.map((item) => {
//               const img = item.image[0].asset._ref;
//               const newImage = img.replace('image-', 'https://cdn.sanity.io/images/do8o6hyx/app-data-production/').replace('-webp', '.webp');
              
//               //console.log('IMAGE', newImage)
//               return {
//                 price_data: {
//                   currency: 'usd',
//                   product_data: {
//                     name: item.name,
//                     images: [newImage],
//                   },
//                   unit_amount: item.price * 100,
//                 },
//                 adjustable_quantity: {
//                   enabled: true,
//                   minimum: 1,
//                 },
//                 quantity: item.quantity

//               }
//         }),
      
//         //mode: 'payment',
//         success_url: `${req.headers.origin}/?success=true`,
//         cancel_url: `${req.headers.origin}/?canceled=true`,
//       }
      
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create(params);
//       //res.redirect(303, session.url);
//       res.status(200).json(session);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }

















// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const params = {
//         submit_type: 'pay',
//         mode: 'payment',
//         payment_method_types: ['card'],
//         billing_address_collection: 'auto',
//         shipping_options: [
//           { shipping_rate: 'shr_1Kn3IaEnylLNWUqj5rqhg9oV' },
//         ],
//         line_items: req.body.map((item) => {
//           const img = item.image[0].asset._ref;
//           const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

//           return {
//             price_data: { 
//               currency: 'usd',
//               product_data: { 
//                 name: item.name,
//                 images: [newImage],
//               },
//               unit_amount: item.price * 100,
//             },
//             adjustable_quantity: {
//               enabled:true,
//               minimum: 1,
//             },
//             quantity: item.quantity
//           }
//         }),
//         success_url: `${req.headers.origin}/success`,
//         cancel_url: `${req.headers.origin}/canceled`,
//       }

//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create(params);

//       res.status(200).json(session);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }








// import Stripe from 'stripe';
// const stripe = new Stripe (process.env.
//   NEXT_PUBLIC_STRIPE_SECRET_KEY);

//   export default async function handler(req, res) {
//     if(req.method === 'POST') {
//       try {

//       }catch(error) {
//         res.status(500).json({statusCode: 500, message: error.message})
//       }
//     }
//   }