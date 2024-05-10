import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../helper';
import {
  Category,
  Doctor,
  Doctors,
  Subcategory,
  UpComingSessions,
} from '@/types';

export const useGetCategories = () => {
  const getCat = async () => {
    const { data } = await axios.get(`${api}?api=practitionercategory`);
    return data as Category[];
  };
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCat,
  });
};
export const useGetSpecialists = (cat: string) => {
  const getSpecialists = async () => {
    const res = await axios.get(
      `${api}?api=specialistlist&categoryname=${cat}`
    );

    let data = [];
    if (Object.prototype.toString.call(res.data) === '[object Object]') {
      data.push(res.data);
    } else if (Object.prototype.toString.call(res.data) === '[object Array]') {
      data = [...res.data];
    }

    return data as Subcategory[];
  };
  return useQuery({
    queryKey: ['specialists', cat],
    queryFn: getSpecialists,
  });
};

export const useGetAll = () => {
  const getSpecialists = async () => {
    const res = await axios.get(`${api}?api=consultationsearch`);

    let data = [];
    if (Object.prototype.toString.call(res.data) === '[object Object]') {
      data.push(res.data);
    } else if (Object.prototype.toString.call(res.data) === '[object Array]') {
      data = [...res.data];
    }

    return data as Doctors[];
  };
  return useQuery({
    queryKey: ['all_sessions'],
    queryFn: getSpecialists,
  });
};
export const useGetSession = (cat: string) => {
  const getSpecialists = async () => {
    const res = await axios.get(
      `${api}?api=consultationsearch&categoryname=${cat}`
    );

    let data = [];
    if (Object.prototype.toString.call(res.data) === '[object Object]') {
      data.push(res.data);
    } else if (Object.prototype.toString.call(res.data) === '[object Array]') {
      data = [...res.data];
    }

    return data as Doctors[];
  };
  return useQuery({
    queryKey: ['sessions', cat],
    queryFn: getSpecialists,
  });
};
export const useComingSessions = (ref: string) => {
  const getUpcomingSessions = async () => {
    const res = await axios.get(
      `${api}?api=upcomingsessions&patientref=${ref}`
    );

    let data = [];
    if (Object.prototype.toString.call(res.data) === '[object Object]') {
      data.push(res.data);
    } else if (Object.prototype.toString.call(res.data) === '[object Array]') {
      data = [...res.data];
    }

    return data as UpComingSessions[];
  };
  return useQuery({
    queryKey: ['upcoming_sessions', ref],
    queryFn: getUpcomingSessions,
  });
};

export const useDoctor = (id: string) => {
  const getUpcomingSessions = async () => {
    const { data } = await axios.get(`${api}?api=sessioninfo&sessionid=${id}`);

    return data as Doctor;
  };
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: getUpcomingSessions,
  });
};
