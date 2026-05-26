import { createContext, useContext, useState } from "react";

type PriceContextType = {
    price: number | null;
    loading: boolean;
    apiError: string;
    fetchPrice: (serviceType: string) => Promise<void>;
    clearPrice: () => void;
};

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: {children: React.ReactNode }){
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    async function fetchPrice(serviceType: string){
        setPrice(null);
        setApiError("");
        if (serviceType === ""){
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                `/api/service-price?serviceType=${serviceType}`
            );
            const data = await response.json();
            if (!response.ok){
                setApiError(data.message || "Could not fetch service price.");
                return;
            }
            setPrice(data.price);
        } catch {
            setApiError("Something went wrong while fetching service price.");
        } finally {
            setLoading(false);
        }
    }
    function clearPrice(){
        setPrice(null);
        setApiError("");
        setLoading(false);
    }
    return (
        <PriceContext.Provider
            value = {{
                price,
                loading,
                apiError,
                fetchPrice,
                clearPrice,
            }}
            >
                {children}
            </PriceContext.Provider>
    );
}
export function usePriceContext() {
    const context = useContext(PriceContext);
    if (!context){
        throw new Error("usePriceContext must be used inside PriceProvider");
    }
    return context;
}