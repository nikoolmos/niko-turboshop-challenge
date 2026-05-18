'use client';

import { PartProviders } from "@/app/common/utils/PartProviderEnum";
import { useEffect, useState } from "react";
import { GetItemDetailService } from "../services/getItemDetailService";
import { GetItemDetailServiceResponse } from "../interfaces/getItemDetailServiceResponse";
import { PartDetail } from "../interfaces/PartDetail";

export interface UseGetPartDetailConfig {
    id: string;
    provider: string;
}

export function useGetPartDetail({ id, provider }: UseGetPartDetailConfig) {
    const [partData, setPartData] = useState<PartDetail>();
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        GetItemDetailService.getDetails(id, provider)
            .then((data:PartDetail) => {
                setPartData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setIsLoading(false);
            });
    }, [id, provider]);


    const retry = () => { }

    return {
        error,
        partData,
        isLoading,
        retry,
    };
}