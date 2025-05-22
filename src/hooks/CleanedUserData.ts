import { TUsers } from "@/Types";

export function useCleanedUserData() {
    const cleanedUserData = (user: TUsers) => ({
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
            // @ts-ignore-next-line
            houseNumber: String(user.address?.houseNumber),
            // @ts-ignore-next-line
            zip: String(user.address?.zip),
        }
    });

    return cleanedUserData;
}