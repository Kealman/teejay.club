import NextLink from "next/link";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

type Props = ComponentProps<typeof NextLink>;

export const Link = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;
    return (
      <NextLink href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </NextLink>
    );
  }
);

Link.displayName = "Link";
