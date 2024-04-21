import apis from '@/apis';
import { Profile } from '@/apis/type';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetHeroes = () => {
	return useQuery({
		queryKey: ['heroes'],
		queryFn: async () => {
			const data = await apis.getHeroes();
			return data;
		},
	});
};

export const useGetHeroById = (id: string) => {
	return useQuery({
		queryKey: ['hero', id],
		enabled: !!id,
		queryFn: async () => {
			const data = await apis.getHeroById(id);
			return data;
		},
	});
};

export const useUpdateHeroProfile = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, profile }: { id: string; profile: Profile }) => {
			return apis.updateHeroProfile(id, profile);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['hero'] });
		},
	});
};
