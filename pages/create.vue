<template>
  <div>
    <div class="m-2">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-outline-primary">
          <input type="radio" name="options" id="preview"> <i class="fas fa-eye"></i> 预览
        </label>
        <label class="btn btn-outline-primary active">
          <input type="radio" name="options" id="edit" checked> <i class="fas fa-pencil-alt"></i> 编辑
        </label>
      </div>
      <button class="btn btn-success float-right" id="submit"><i class="fas fa-check"></i> 提交</button>
    </div>
    <div id="full_edit">
      <form>
        <div class="form-group row">
          <label for="article_title" class="col-sm-2 col-form-label">文章标题</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="article_title">
          </div>
        </div>
        <div class="form-group row">
          <label for="article_description" class="col-sm-2 col-form-label">文章描述</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="article_description">
          </div>
        </div>
        <div class="form-group row">
          <label for="small_picture" class="col-sm-2 col-form-label">方形小图</label>
          <div class="col-sm-10">
            <input type="url" class="form-control" id="small_picture">
          </div>
        </div>
        <div class="form-group row">
          <label for="big_picture" class="col-sm-2 col-form-label">文章头图</label>
          <div class="col-sm-10">
            <input type="url" class="form-control" id="big_picture">
          </div>
        </div>
        <div class="form-group row ml-0">
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="visible">
            <label class="custom-control-label" for="visible">博文是否可见</label>
          </div>
          <div class="ml-lg-4">
            博客类型
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input">
              <label class="custom-control-label" for="customRadioInline1">大博文</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input">
              <label class="custom-control-label" for="customRadioInline2">小博文</label>
            </div>
          </div>
        </div>

      </form>
      <div class="d-inline-block m-1">
        <button class="btn btn-secondary" id="upload_md"><i class="fas fa-arrow-up"></i>上传md源代码</button>
        <button class="btn btn-secondary" id="download_md"><i class="fas fa-arrow-down"></i>下载md源代码</button>
      </div>

      <div class="d-inline-block m-1">
        <button class="btn btn-secondary" id="copy_all"><i class="fas fa-copy"></i>全部复制到剪贴板</button>
      </div>

      <textarea class="form-control mt-3" rows="10" id="MD_source"># </textarea>
    </div>


    <div id="HTML_preview"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.alinement {
  margin-right: .5em;
}

.biggest {
  width: 75%;
  margin: auto;
}

.icon-plate {
  position: absolute;
  right: 13%;
}


.small-blog-item {
  display: flex;
  border: grey 1px solid;
  border-radius: 2px;
  padding: .5em;
  width: 75%;
  margin: 1rem auto;
  position: relative;
  box-shadow: grey 1px 1px;
}

.intro-area {
  flex: 2;
  overflow: hidden;
  max-height: 180px;
  margin-bottom: 1em;
}

.img-area {
  width: 200px;
  height: 200px;
  overflow: hidden;
  margin-left: auto;
}

.date-view-talk {
  position: absolute;
  bottom: 0;
}

.big-blog-item {
  border: grey 1px solid;
  border-radius: 2px;
  padding: .5em;
  width: 75%;
  margin: 1rem auto;
  position: relative;
  box-shadow: grey 1px 1px;
}

.big-img-area {
  max-height: 200px;
  overflow: hidden;
}

.big-image {
  width: 100%;
}

.big-intro-area {
  margin-bottom: 1em;
  min-height: 150px;
}

@media (max-width: 512px) {
  .biggest {
    width: 98%;
    margin: auto;
  }

  .icon-plate {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
  }

  .small-blog-item {
    width: unset;
  }

  .big-blog-item {
    width: unset;
  }

  .img-area {
    display: none;
  }
}
</style>
