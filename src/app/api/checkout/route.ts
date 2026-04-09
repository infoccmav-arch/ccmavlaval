import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const PRODUCTS: Record<string, { name: string; amount: number; description: string }> = {
  ami: {
    name: "Don — Ami(e) du CCMAV",
    amount: 2500, // in cents
    description: "Soutien ponctuel pour nos activités",
  },
  batisseur: {
    name: "Don — Bâtisseur/se du CCMAV",
    amount: 5000,
    description: "Aide au démarrage du centre",
  },
  mecene: {
    name: "Don — Mécène du CCMAV",
    amount: 10000,
    description: "Soutien majeur à long terme",
  },
  membre: {
    name: "Adhésion annuelle — CCMAV",
    amount: 1000,
    description: "Cotisation annuelle — accès aux avantages membres",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { type } = await req.json();

    const product = PRODUCTS[type];
    if (!product) {
      return NextResponse.json({ error: "Produit invalide" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${BASE_URL}/don/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/don/annule`,
      locale: "fr",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: "Erreur lors de la création du paiement" }, { status: 500 });
  }
}
