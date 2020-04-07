// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ActionCreator } from '../types';

import { ActionTypes } from './../../constants/index';
import httpClient from './../../utils/httpUtil';

export const startBot: ActionCreator = ({ dispatch }, toStartBot) => {
  dispatch({
    type: ActionTypes.TO_START_BOT,
    payload: {
      toStartBot,
    },
  });
};

export const getPublishTargetTypes: ActionCreator = async ({ dispatch }) => {
  try {
    const response = await httpClient.get(`/publish/types`);
    dispatch({
      type: ActionTypes.GET_PUBLISH_TYPES_SUCCESS,
      payload: {
        typelist: response.data,
      },
    });
  } catch (err) {
    // dispatch({ type: ActionTypes.GET_PUBLISH_TYPES_FAILURE, payload: null, error: err });
  }
};

export const publishToTarget: ActionCreator = async ({ dispatch }, projectId, target, metadata) => {
  try {
    const response = await httpClient.post(`/publish/${projectId}/publish/${target.name}`, metadata);
    dispatch({
      type: ActionTypes.PUBLISH_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.PUBLISH_FAILED,
      payload: {
        error: err.response.data,
      },
    });
  }
};

// get bot status from target publisher
export const getPublishStatus: ActionCreator = async ({ dispatch }, projectId, target) => {
  try {
    const response = await httpClient.get(`/publish/${projectId}/status/${target.name}`);
    dispatch({
      type: ActionTypes.GET_PUBLISH_STATUS,
      payload: response.data,
    });
  } catch (err) {
    console.error(err.response.data.message);
  }
};

export const getPublishHistory: ActionCreator = async ({ dispatch }, projectId, target) => {
  try {
    const response = await httpClient.get(`/publish/${projectId}/history/${target.name}`);
    console.log(response.data);
    dispatch({
      type: ActionTypes.GET_PUBLISH_HISTORY,
      payload: response.data.results,
    });
  } catch (error) {
    console.error(error);
  }
};