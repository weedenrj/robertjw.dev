import clsx from "clsx";
import { Icon } from "./icon/Icon";

export type ModalProps = {
  closeModal: () => void
} & React.HTMLAttributes<HTMLDivElement>

export function Modal({
  closeModal,

  className,
  children,
  ...rest
}: ModalProps) {
  return (
    <div className={clsx(className, "justify-center items-center flex overflow-x-hidden",
      "overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-100 h-100",
      "bg-[rgba(0,0,0,0.75)]"
    )}
      {...rest}
    >
      <div
        id="portfiloOne"
        className="!max-w-[800px] absolute left-[50%] top-[50%] mr-auto ml-auto flex w-[85%] translate-x-[-50%] translate-y-[-50%] items-center rounded-[0.75rem] p-4 bg-white dark:bg-[rgb(50,50,50)] shadow-sm"
      >
        <div className="overflow-y-auto max-h-[60vh] lg:max-h-[80vh] dark:scrollbarDark scrollbarLight">
          {children}
        </div>

        <button
          className={clsx("size-[40px] absolute z-40 -top-5 -right-5",
            "block bg-contain bg-no-repeat bg-center rounded-full transition-[0.3ms]",
            "cursor-pointer items-center justify-center rounded-full bg-opacity-100 text-opacity-100 text-black transition-all duration-300 ease-in-out hover:bg-modal-text hover:text-white bg-white dark:hover:bg-modal-text dark:bg-dark-bg-three dark:text-white"
          )}
          onClick={closeModal}
        >
          <Icon name="X"  size="xl" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
