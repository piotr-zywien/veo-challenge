import axios from 'axios'

import { NodeShape } from '../components/node';
import { TreeShape } from '../components/tree';


const HOST = 'http://localhost:2011/veo';

const Resource = axios.create({
  baseURL: HOST,
});

const getIndex = () => Resource.get(
  '/getIndex',
).then(({ data }) => data);

const getNodes = () => Resource.get(
  '/getNodes',
).then(({ data }) => data);

const getTree = () => Resource.get(
  '/getTree',
).then(({ data }) => data);

const onSave = (payload: {
  index?: number,
  nodes?: NodeShape[],
  tree?: TreeShape,
}) => Resource.post(
  '/onSave',
  payload,
).then(({ data }) => data);

export default {
  getIndex,
  getNodes,
  getTree,
  onSave,
};
