import Toast from '../components/Form/Toast'
import create from './create.js'

export default function toast (props) {
  return create(Toast, props).show();
}