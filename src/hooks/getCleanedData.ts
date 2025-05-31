import { TCards, TUsers } from "@/Types";

export const cleanedUserData = (user: TUsers) => ({
        name: {
            first: user.name.first,
            middle: user.name?.middle || '',
            last: user.name.last,
        },
        phone: user.phone,
        image: {
            url: user.image?.url || '',
            alt: user.image?.alt || '',
        },
        address: {
            state: user.address?.state || '',
            country: user.address?.country,
            city: user.address?.city,
            street: user.address?.street,
            houseNumber: String(user.address?.houseNumber),
            zip: String(user.address?.zip),
        }
});

export const cleanedCardData = (card: TCards) => ({
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web,
        image: {
            url: card.image?.url || '',
            alt: card.image?.alt || '',
        },
        address: {
            state: card.address?.state || '',
            country: card.address?.country,
            city: card.address?.city,
            street: card.address?.street,
            houseNumber: String(card.address?.houseNumber),
            zip: String(card.address?.zip),
        }
    })