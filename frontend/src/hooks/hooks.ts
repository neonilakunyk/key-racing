import useSound from 'use-sound';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
export { useState, useEffect, useRef, useContext, useCallback } from 'react';
export { useHistory, useLocation, useParams } from 'react-router-dom';
export { useForm } from 'react-hook-form';
export { yupResolver } from '@hookform/resolvers/yup';

import { AppDispatch, RootState } from '../common/types/types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector, useSound };
