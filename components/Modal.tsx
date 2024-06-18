import clsx from "clsx";

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
        <div className="overflow-y-scroll min-[1700px]:overflow-hidden max-h-[60vh] lg:max-h-[80vh] dark:scrollbarDark scrollbarLight">
          {children}
        </div>
        <a
          href="#close-modal"
          className="absolute !top-[-20px] !right-[-20px] block !w-[50px] !h-[50px] indent-[-9999px] bg-contain bg-no-repeat bg-center rounded-full invert-[0.9] hover:invert-[1] transition-[0.3ms] bg-close-light dark:bg-close-dark"
          onClick={closeModal}
        >
          Close
        </a>
      </div>
    </div>
  );
};

export default Modal;
