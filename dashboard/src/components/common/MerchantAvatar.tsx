import defaultAvatar from '@/assets/images/default-avatar.png';

const MerchantAvatar = ({ className, src }) => (
  <img
    className={className}
    src={src}
    alt=""
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      currentTarget.src = defaultAvatar;
    }}
  />
);

export default MerchantAvatar;
