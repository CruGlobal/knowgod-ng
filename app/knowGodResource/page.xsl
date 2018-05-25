<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="https://mobile-content-api.cru.org/xmlns/tract" xmlns:c="https://mobile-content-api.cru.org/xmlns/content" exclude-result-prefixes="t c">
  <xsl:output method="xml" encoding="utf-8" />
<!-- Match page root -->
  <xsl:template match="/">
    <xsl:apply-templates />
  </xsl:template>

  <xsl:template match="t:page/t:header">
    <div class="py25 kg-bg-blue kg-white">
      <h1 class="fl ml25 kg-white"><xsl:value-of select="t:number/c:text" /></h1>
      <h2 class="mx100 kg-white"><xsl:value-of select="t:title/c:text" /></h2>
    </div>
    <xsl:if test="../@background-image">
    <div class="frame-square">
      <xsl:apply-templates select="../@background-image"/>
    </div>
    </xsl:if>
  </xsl:template>


  <xsl:template match="t:page/t:cards/t:card">
    <div class="mx100">
      <xsl:if test="@hidden">
        <xsl:attribute name="hidden"></xsl:attribute>
      </xsl:if>
      <xsl:if test="@dismiss-listeners">
        <xsl:attribute name="dismiss-listeners"><xsl:value-of select="@dismiss-listeners"/></xsl:attribute>
      </xsl:if>
      <xsl:if test="@listeners">
        <xsl:attribute name="listeners"><xsl:value-of select="@listeners"/></xsl:attribute>
      </xsl:if>

      <xsl:if test="@background-image-align='top'">
        <xsl:apply-templates select="@background-image"/>
      </xsl:if>

      <xsl:apply-templates />

      <xsl:if test="@background-image-align='bottom'">
        <xsl:apply-templates select="@background-image"/>
      </xsl:if>

    </div>
  </xsl:template>

  <xsl:template match="@background-image">
    <xsl:element name="img">
      <xsl:attribute name="image-resource">
        '<xsl:value-of select="."/>' <!-- single quote to protect from ng-compile -->
      </xsl:attribute>
      <xsl:attribute name="class">w100</xsl:attribute>
    </xsl:element>
  </xsl:template>

  <xsl:template match="t:hero">
    <div class="mx100">
      <xsl:apply-templates />
    </div>
  </xsl:template>

  <xsl:template match="t:heading">
      <h2 class="kg-blue tc"><xsl:value-of select="c:text" /></h2>
  </xsl:template>

  <xsl:template match="c:paragraph">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>


<!-- FORMS -->
  <xsl:template match="c:form">
    <form>
      <xsl:apply-templates/>
    </form>
  </xsl:template>

  <xsl:template match="c:input">
    <label>
      <h3 class="tl"><xsl:value-of select="c:label"/></h3>
      <input>
        <xsl:attribute name="type"><xsl:value-of select="@type"/></xsl:attribute>
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
        <xsl:if test="c:placeholder"><xsl:attribute name="value"><xsl:value-of select="c:placeholder/c:text"/></xsl:attribute></xsl:if>
        <xsl:if test="@required"><xsl:attribute name="required"></xsl:attribute></xsl:if>
      </input>
    </label>
  </xsl:template>



<!-- MODALS -->
  <xsl:template match="t:modals/t:modal">
    <modal id="1">
      <xsl:if test="@dismiss-listeners">
        <xsl:attribute name="dismiss-listeners"><xsl:value-of select="@dismiss-listeners"/></xsl:attribute>
      </xsl:if>
      <xsl:if test="@listeners">
        <xsl:attribute name="listeners"><xsl:value-of select="@listeners"/></xsl:attribute>
      </xsl:if>

      <div class="modal">
        <div class="modal-body">
          <h2 class=""><xsl:value-of select="t:title/c:text" /></h2>
          <xsl:apply-templates select="c:paragraph"/>
        </div>
      </div>
      <div class="modal-background"></div>
    </modal>
  </xsl:template>


<!-- Elements -->
  <xsl:template match="c:input">
    <label>
      <h3 class="tl"><xsl:value-of select="c:label"/></h3>
      <input>
        <xsl:attribute name="type"><xsl:value-of select="@type"/></xsl:attribute>
        <xsl:attribute name="name"><xsl:value-of select="@name"/></xsl:attribute>
        <xsl:if test="c:placeholder"><xsl:attribute name="placeholder"><xsl:value-of select="c:placeholder/c:text"/></xsl:attribute></xsl:if>
        <xsl:if test="@required"><xsl:attribute name="required"></xsl:attribute></xsl:if>
      </input>
    </label>
  </xsl:template>

  <xsl:template match="c:button">
    <span class="db tc button">
      <a class="kg-bg-blue kg-bg-blue-hover kg-white kg-blue-dark-hover">
        <xsl:if test="@type='url'">
          <xsl:attribute name="href">http://www.<xsl:value-of select="./@url" /></xsl:attribute>
        </xsl:if>
        <xsl:if test="@type='event'">
          <xsl:attribute name="href">eevent</xsl:attribute>
        </xsl:if>
        <xsl:if test="@events">
          <xsl:attribute name="events"><xsl:value-of select="@events"/></xsl:attribute>
        </xsl:if>

        <xsl:value-of select="c:text"/>
      </a>
    </span>
  </xsl:template>

  <xsl:template match="c:link">
    <a class="kg-blue" href="">
      <xsl:if test="@events">
        <xsl:attribute name="events"><xsl:value-of select="@events"/></xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </a>
  </xsl:template>

  <xsl:template match="c:tabs/c:tab">
    <div>
      <xsl:apply-templates />
    </div>
  </xsl:template>

  <xsl:template match="c:paragraph//c:text">
    <span>
      <xsl:attribute name="class">db mx144</xsl:attribute>
      <xsl:apply-templates select="@text-align"/>
      <xsl:value-of select="." />
    </span>
  </xsl:template>

  <xsl:template match="t:label | c:label">
    <h2><xsl:value-of select="c:text" /></h2>
  </xsl:template>

  <xsl:template match="c:paragraph//c:image">
    <xsl:element name="img">
      <xsl:attribute name="image-resource">
        '<xsl:value-of select="@resource"/>' <!-- single quote to protect from ng-compile -->
      </xsl:attribute>
      <xsl:attribute name="class">w100</xsl:attribute>
    </xsl:element>
  </xsl:template>

  <xsl:template match="@text-align">
    <xsl:attribute name="text-align">
      <xsl:value-of select="."/>
    </xsl:attribute>
  </xsl:template>

  <xsl:template match="t:page/t:call-to-action">
    <div class="mx100">
      <h3><xsl:value-of select="c:text" /></h3>
    </div>
  </xsl:template>

</xsl:stylesheet>