import { DetailedHTMLProps, FC, SVGAttributes } from 'react';

export type SvgProps<ExtraProps extends object = {}> = DetailedHTMLProps<
  SVGAttributes<SVGElement>,
  SVGSVGElement
> &
  ExtraProps;

export type FCIcon<ExtraProps extends object = {}> = FC<SvgProps<ExtraProps>>;
