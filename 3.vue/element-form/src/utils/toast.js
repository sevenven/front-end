import Toast from '../components/Toast'
import create from './create.js'

export default function toast (props) {
  return create(Toast, props).show();
}