import useSound from 'use-sound';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
export { useState, useEffect, useRef, useContext, useCallback } from 'react';
export { useHistory, useLocation, useParams } from 'react-router-dom';
export { useForm } from 'react-hook-form';
export { yupResolver } from '@hookform/resolvers/yup';

import { AppDispatch, RootState } from '../common/types';

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector, useSound };
