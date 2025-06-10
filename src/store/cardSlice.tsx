import { TCards, TCardsArray } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CardState = {
    cards: TCardsArray | null;
    sortOption: string;
}
const initialState:CardState = {
    cards: null as TCardsArray | null,
    sortOption: '',
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCardsSlice: (state, action:PayloadAction<TCardsArray>) => {
            state.cards = action.payload;
        },
        addCard: (state, action:PayloadAction<TCards>) => {
            if (state.cards){
                state.cards.push(action.payload);
            }
        },
        editCard: (state, action:PayloadAction<{card:TCards}>) => {
            const updatedCard = action.payload.card;
            
            if (state.cards) {
                const index = state.cards?.findIndex((reduxCard) => reduxCard._id === updatedCard._id);
                    if (index !== -1){
                        state.cards[index] = updatedCard;
                    }
            }
        },
        removeCard: (state, action:PayloadAction<TCards>) => {
            if (state.cards){
                state.cards = state.cards?.filter((card) => 
                    card._id !== action.payload._id)
            }
        },
        addLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;
            if (!state.cards) {return}
            
            const cardIndex = state.cards.findIndex((reduxCard) => reduxCard._id === card._id);
            if (cardIndex !== -1) {
                const currentCard = state.cards[cardIndex];
            
                if (!currentCard.likes?.includes(userID)) {
                    state.cards[cardIndex] = {
                        ...currentCard, 
                        likes: [...(currentCard.likes || []), userID]
                    }
                }
            }          
        },
        removeLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;
            if (!state.cards) {return}

            const cardIndex = state.cards.findIndex((reduxCard) => reduxCard._id === card._id);
            if (cardIndex !== -1) {
                const currentCard = state.cards[cardIndex];
                const currentLikes = currentCard.likes || [];
                if (currentCard.likes?.includes(userID)) {
                    state.cards[cardIndex] = {
                        ...currentCard!, 
                        likes: currentLikes.filter((like) => like !== userID)
                    }
                }
            }          
        },
        setSortOption: (state, action:PayloadAction<string>) => {
            state.sortOption = action.payload   
        }
    },
});

export const {setCardsSlice, addCard, editCard, removeCard, addLike, removeLike, setSortOption} = cardSlice.actions;
export default cardSlice.reducer;