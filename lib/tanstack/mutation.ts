import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useAuth } from '../zustand/auth';
import { useRouter } from 'expo-router';
import { api } from '../helper';

export const useDeleteProfile = () => {
  const { clearId, id } = useAuth();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${api}?api=deleteaccount&patientref=${id}`);
      return data;
    },
    onSuccess: () => {
      clearId();
      router.push('/');
      Toast.show({
        type: 'transparentToast',
        text1: 'Hate to see you leave 😔',
        text2: 'Profile Deleted Successfully',
        position: 'top',
      });
    },
    onError: () => {
      Toast.show({
        type: 'transparentToast',
        text1: 'Failed to delete profile',
        text2: 'Something went wrong, try again',
        position: 'top',
      });
    },
  });
};
