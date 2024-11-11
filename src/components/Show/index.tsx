import React, {Children, PropsWithChildren} from 'react';

export type ShowProps = PropsWithChildren<{
    isTrue?: object | string | number | boolean | null;
}>;

const Show: React.FC<PropsWithChildren> & {When: React.FC<ShowProps>} & {Else: React.FC<PropsWithChildren>} = props => {
    let when: React.JSX.Element | null = null;
    let otherwise: React.JSX.Element | null = null;

    Children.forEach(props.children as React.JSX.Element, (children: React.JSX.Element | null) => {
        if (children?.props.isTrue === undefined) {
            otherwise = children;
        } else if (!when && children.props.isTrue) {
            when = children;
        }
    });

    return when || otherwise;
};

Show.When = ({isTrue, children}) => (isTrue ? (children as React.JSX.Element) : null);
Show.Else = ({children}) => children as React.JSX.Element;

export default Show;
