import { useInView } from '../hooks/useInView';

/**
 * Fades content up as it enters the viewport.
 * `as` keeps the markup semantic — a list item stays a list item.
 */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
  ...rest
}) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`rv ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ '--i': delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
