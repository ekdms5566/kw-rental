import useInput from "../../hook/useInput"
import { Div, TextareaStyle, Span } from "./style"

export default function Textarea({ placeholder, cols, rows, maxLen, className, count, defaultValue }) {
  const maxLenFunc = value => value.length <= maxLen
  const textareaEl = useInput(defaultValue || "", maxLenFunc)

  return (
    <Div>
      <TextareaStyle
        {...textareaEl}
        className={className}
        id="" cols={cols} rows={rows}
        placeholder={placeholder}></TextareaStyle>
      {count ? <Span>{`(${textareaEl.value.length}/${count})`}</Span> : <></>}
    </Div>
  )
}
